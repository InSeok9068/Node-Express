let langList = []

$('#langBtn').click(function(){
  langList = []
  const langText = $('#langText').val()

  findLangTag(langText)
  
  for(let obj of langList){
    //console.log(obj.get("msgkey") + " | " + obj.get("nullvalue"))
    console.table(obj)
  }
});

const findLangTag = langText => {
  let firstTagIdx = langText.indexOf("<with:message")

  if(firstTagIdx == -1){
    return false
  }else{
    let lastTagIdx  = langText.substr(firstTagIdx).indexOf("/")+2

    let langTag = langText.substr(firstTagIdx,lastTagIdx)

    let langMap = new Map();

    if(langTag.includes("\'")){
      if(langTag.includes("msgkey")){
        let msgKeyFirstIndex = langTag.indexOf("msgkey")
        let msgKeyMidIndex   = langTag.substr(msgKeyFirstIndex).indexOf("=")+2
        let msgKeyLastIndex  = langTag.substr(msgKeyFirstIndex+msgKeyMidIndex).indexOf("\'")
        langMap.set("msgkey",langTag.substring(msgKeyFirstIndex+msgKeyMidIndex,msgKeyFirstIndex+msgKeyMidIndex+msgKeyLastIndex))
      }
      if(langTag.includes("nullvalue")){
        let nullValueFirstIndex = langTag.indexOf("nullvalue")
        let nullValueMidIndex   = langTag.substr(nullValueFirstIndex).indexOf("=")+2
        let nullValueLastIndex  = langTag.substr(nullValueFirstIndex+nullValueMidIndex).indexOf("\'")
        langMap.set("nullvalue",langTag.substring(nullValueFirstIndex+nullValueMidIndex,nullValueFirstIndex+nullValueMidIndex+nullValueLastIndex))
      }
    }else{
      if(langTag.includes("msgkey")){
        let msgKeyFirstIndex = langTag.indexOf("msgkey")
        let msgKeyMidIndex   = langTag.substr(msgKeyFirstIndex).indexOf("=")+2
        let msgKeyLastIndex  = langTag.substr(msgKeyFirstIndex+msgKeyMidIndex).indexOf("\"")
        langMap.set("msgkey",langTag.substring(msgKeyFirstIndex+msgKeyMidIndex,msgKeyFirstIndex+msgKeyMidIndex+msgKeyLastIndex))
      }
      if(langTag.includes("nullvalue")){
        let nullValueFirstIndex = langTag.indexOf("nullvalue")
        let nullValueMidIndex   = langTag.substr(nullValueFirstIndex).indexOf("=")+2
        let nullValueLastIndex  = langTag.substr(nullValueFirstIndex+nullValueMidIndex).indexOf("\"")
        langMap.set("nullvalue",langTag.substring(nullValueFirstIndex+nullValueMidIndex,nullValueFirstIndex+nullValueMidIndex+nullValueLastIndex))
      }
    }
    langList.push(langMap)

    findLangTag(langText.substr(firstTagIdx+lastTagIdx))
  }
}

