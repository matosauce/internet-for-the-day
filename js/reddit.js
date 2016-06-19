var getYoutubeLinks = function() {
  $.get("https://www.reddit.com/r/youtubehaiku.json").done(function (data) {
    var linkList = extractYoutubeLinks(data);
    $("#videoPlayer").html(constructVideoString(linkList));
  });
}

function constructVideoString(linkList) {
  var srcString = "";
  var firstVideo = true;
  for (var index in linkList) {
    link = linkList[index];
    if (firstVideo) {
      srcString += "https://www.youtube.com/embed/" + link + "?autoplay=1&playlist=";
      firstVideo = false;
    } else {
      srcString += link + ",";
    }
  }

  return "<iframe width=\"420\" height=\"315\" "
          + "src=" + srcString + " frameborder=\"0\" width=\"560\" height=\"315\">"
          + "</iframe>";
}

function extractYoutubeLinks(data) {
  var linkList = new Array();

  var posts = data.data.children;
  for (var index in posts) {
    var post = posts[index];
    var mediaContent = post.data.media_embed.content;
    var link = extractLinkFromMediaContent(mediaContent);
    if (link != null) {
      linkList.push(link);
    }
  }

  return linkList;
}

function extractLinkFromMediaContent(mediaContent) {
  if (mediaContent != null) {
    return mediaContent.split("/embed/")[1].split("?")[0];
  }
  return null;
}

$("#internetButton").click(getYoutubeLinks);