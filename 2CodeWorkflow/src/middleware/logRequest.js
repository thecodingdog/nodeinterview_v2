module.exports = async (ctx, next) => {
  const {log, url, request, query, headers} = ctx;

  log.debug(url, {
    body: request.body,
    query: query,
    headers: headers
  });

  await next();
};
