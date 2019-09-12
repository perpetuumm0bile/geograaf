//Just to make it a little bit easier task for a player, I decided to use only cities and towns in this game 
//(means that villages and other entities are excluded)
//To make it happen, I send requests to geonames API with 'generic' parameter = 1,2,23,9,44. 
// See all possible generic valsues here https://geogratis.gc.ca/services/geoname/en/codes/generic/

const getRandLocality = async () => {
    const randProvince = await getRandProvince()
    const randProvinceCode = randProvince['code']
    const answer = await fetch(`https://geogratis.gc.ca/services/geoname/en/geonames.json?generic=1,2,23,9,44&num=10&province=${randProvinceCode}`)
    
    if (answer.status === 200) {    
        const answerJSON = await answer.json()
        let localitiesArray = answerJSON['items']
        localitiesArray = localitiesArray.filter((e) => !e['name'].includes('-') & !e['name'].includes(' ')) //filtering names with dashes and spaces
        const randNum = getRandomInt(0,localitiesArray.length)
        let randomLocality = localitiesArray[randNum]
        randomLocality['province'] = randProvince['description'] //converting province code to province name to give a hint to the player
        const localityName = randomLocality['name'].toLowerCase()

        //finding a word that sounds like the locality name and adding it to the locality object properties.
        //Providing the player with sound-alike makes the game more playable - names are hard to guess otherwise.
        
        let soundAlike = await fetch(`https://api.datamuse.com/words?sl=${localityName}.json`, {mode: 'cors'})
        // let soundAlike = await fetch(`https://api.datamuse.com/words?sl=${localityName}.json`, {mode: 'no-cors'})
        
        if (soundAlike.status === 200){
            soundAlike = await soundAlike.json()
            soundAlike = soundAlike.filter(item => !item['word'].includes(localityName))
            randomLocality['soundAlike'] = soundAlike[0]['word']
            
            return randomLocality

        } else {
            throw new Error ('Could not retrieve a soundAlike!')
        }
         
    } else {
        throw new Error ('Could not retrieve a locality!')
    }

}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  
}

// retrieving a random province with the mapping between province code and province name. It's a nice thing to have since
// API allows to get maximum of 1000 items per request, 
// and items appear in the same order each time you make a request. Thus, random variation of province code
// seems to be a good way of increasing the geographical span for a puzzle. We want first 13 objects from the array - last two
// are neither a province nor a territory. This mapping will be used for providing hints to a player as well.

const getRandProvince = async () => {
    const answer = await fetch('https://geogratis.gc.ca/services/geoname/en/codes/province.json')
    
    if (answer.status === 200) {
        const answerJSON = await answer.json()
        const provinces = answerJSON['definitions'].slice(0,13)
        const randNum = getRandomInt(0,provinces.length)
        const randProvince = provinces[randNum]
        return(randProvince)
    
    } else {
        throw new Error('Could not retrieve a province!')
    }
}

export {getRandLocality, getRandProvince}
