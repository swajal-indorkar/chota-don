const { test } = require('node:test');
const assert = require('node:assert');
const app = require('../server');

function startServer() {
    return new Promise((resolve) => {
        const server = app.listen(0, () => resolve(server));
    });
}

function closeServer(server) {
    // Close keep-alive connections so teardown never hangs on undici's pooled sockets
    server.closeAllConnections?.();
    return new Promise((resolve) => server.close(resolve));
}

test('serves the homepage', async (t) => {
    const server = await startServer();
    t.after(() => closeServer(server));

    const res = await fetch(`http://localhost:${server.address().port}/`);
    assert.strictEqual(res.status, 200);

    const html = await res.text();
    assert.match(html, /For Vedangi/);
});

test('serves static assets (style.css)', async (t) => {
    const server = await startServer();
    t.after(() => closeServer(server));

    const res = await fetch(`http://localhost:${server.address().port}/style.css`);
    assert.strictEqual(res.status, 200);
});

test('falls back to index.html for unknown routes', async (t) => {
    const server = await startServer();
    t.after(() => closeServer(server));

    const res = await fetch(`http://localhost:${server.address().port}/some/unknown/route`);
    assert.strictEqual(res.status, 200);
    assert.match(await res.text(), /For Vedangi/);
});
