export default function shortInfo(overview) {
  const maxLength = 170
  if (overview.length <= maxLength) {
    return <p className='case__info'>{overview}</p>
  }

  // Trim the text to the maximum length
  let shortenedText = overview.substr(0, maxLength)

  // Re-trim if we are in the middle of a word
  shortenedText = shortenedText.substr(0, Math.min(shortenedText.length, shortenedText.lastIndexOf(' ')))

  shortenedText += ' ...'

  return shortenedText
}
