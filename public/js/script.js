const artistSearchForm = document.querySelector("#searchSongsByArtist");
const artistSearchInput = document.querySelector("#songsArtistSearch");
const songsDiv = document.querySelector("#songArtistResults")

artistSearchForm.addEventListener("submit",e=>{
    e.preventDefault();
    songsDiv.innerHTML=``;
    const artist = artistSearchInput.value
    artistSearchInput.value= "";
    songsDiv.innerHTML = `<h2>Results for ${artist}</h2>`
    fetch(`/api/songs/artist/${artist}`).then(res=>res.json()).then(data=>{
        console.log(data);
        data.forEach(datum=>{
            const newCard = document.createElement("div");
            newCard.setAttribute("class","card");
            newCard.innerHTML = `
            <h3>#${datum.position}: ${datum.song}</h3>
            <h4>${datum.year} popularity:${datum.raw_total}</h4>
            `
            songsDiv.append(newCard)
        })

    })
})