const destinationOrigin = 'https://markdown.aicando.xyz'

export default {
  fetch(request) {
    const source = new URL(request.url)
    const destination = new URL(source.pathname + source.search, destinationOrigin)

    return new Response(null, {
      status: 301,
      headers: {
        location: destination.href,
        'cache-control': 'public, max-age=3600'
      }
    })
  }
}
