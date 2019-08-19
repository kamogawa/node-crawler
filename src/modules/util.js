module.exports.makeDoc = () => {
  const $ = cheerio.load(body);

  $(".main-content")
    .children(".d05")
    .remove();

  $(".main-content")
    .children(".d06-anchor-link-menu")
    .remove();

  let twitter_object = $(".main-content")
    .text()
    .replace(/^\n/gm, "");
    
  return twitter_object;
}