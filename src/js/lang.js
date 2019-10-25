const langList = []

$('#langBtn').click(function(){
  let langText = $('#langText').val()

  findLangTag(langText)
  
  console.log(langList)
});

const findLangTag = langText => {
  let firstTagIdx = langText.indexOf("<with:message")

  if(firstTagIdx == -1){
    return false
  }else{
    let lastTagIdx  = langText.substr(firstTagIdx).indexOf("/")+2

    langList.push(langText.substr(firstTagIdx,lastTagIdx))

    findLangTag(langText.substr(lastTagIdx))
  }
}

