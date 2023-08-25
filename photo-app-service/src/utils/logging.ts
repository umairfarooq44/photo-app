/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

import { fromPairs } from 'lodash';
import bunyan from 'bunyan';

const PROJECT_ID = 'kubernetes-experiement';

// https://github.com/googleapis/nodejs-logging-bunyan/blob/7a678d5b/src/index.ts#L28
// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
const BUNYAN_TO_STACKDRIVER: Map<number, string> = new Map([
  [60, 'CRITICAL'],
  [50, 'ERROR'],
  [40, 'WARNING'],
  [30, 'INFO'],
  [20, 'DEBUG'],
  [10, 'DEBUG']
]);

// Pretty print the bunyan log entry for development environment.
const prettyStream = function () {
  const bin = path.resolve(
    path.dirname(require.resolve('bunyan')),
    '..',
    'bin',
    'bunyan'
  );

  if (bin && fs.existsSync(bin)) {
    const formatter = spawn(bin, ['-o', 'short'], {
      stdio: [null, process.stdout, process.stderr]
    });
    return process.stdout.pipe(formatter.stdin);
  } else {
    return process.stdout;
  }
};

// Custom streams are the only way to globally customize the bunyan logging output
// https://github.com/trentm/node-bunyan/blob/a72af248b/examples/raw-stream.js#L12
class StdOutStream {
  write(record: any) {
    try {
      // Anything outside of this happy-path should be immediately fixed.

      // Parse the output serialized by bunyan
      const newRecord = JSON.parse(record);

      // Here we convert logs to stackdriver's special fields
      newRecord.severity = BUNYAN_TO_STACKDRIVER.get(Number(newRecord.level));

      if (newRecord.req_id) {
        newRecord[
          'logging.googleapis.com/trace'
        ] = `projects/${PROJECT_ID}/traces/${newRecord.req_id}`;

        delete newRecord.req_id;
      }

      process.stdout.write(JSON.stringify(newRecord) + '\n');
    } catch (e) {
      log.error('error: could not stringify error: %j', record);
    }
  }
}

/**
 * Parses response header into a plain object.
 * Should never throw
 */
export const parseHeader = (header: unknown) => {
  if (typeof header === 'string') {
    try {
      const lines = header.split(/[\r\n]+/);
      const headerLines = lines.filter(line => line.includes(':'));
      const headerPairs = headerLines.map(hl => hl.split(/\s?:\s?/));

      return fromPairs(headerPairs);
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

/**
 * Use `ctx.log.xyz` where available, instead of this one directly
 */
export const log = bunyan.createLogger({
  name: 'photo-app-service',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'trace',
      // @ts-ignore
      stream:
        process.env.NODE_ENV === 'development'
          ? prettyStream()
          : new StdOutStream()
    }
  ]
});
