export default function shortInfo(overview) {
  const maxLength = 170
  if (overview.length <= maxLength) {
    return overview
  }

  let shortenedText = overview.substr(0, maxLength)
  shortenedText = shortenedText.substr(0, Math.min(shortenedText.length, shortenedText.lastIndexOf(' ')))
  shortenedText += ' ...'

  return shortenedText
}
