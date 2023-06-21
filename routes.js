// This file was added by edgio init.
// You should commit this file to source control.
import { Router } from '@edgio/core';
import fetch from 'node-fetch';

export default new Router().match('/:path*', ({ compute, proxy }) => {
  compute(async (req) => {
    const versions = await (
      await fetch('https://docs.edg.io/docs/versions')
    ).text();

    const targetVersion = versions.replace(/\n/g, '').split(',').pop();

    console.log('computed target version', targetVersion);

    await proxy('api', {
      path: `/${targetVersion}/api/core/index.html`,
      transformResponse: (res) => {
        console.log('transforming response', res.body);
      },
    });
  });
});
