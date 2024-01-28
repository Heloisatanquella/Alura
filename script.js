    const searchInput = document.getElementById('search-input');
    const resultsArtist = document.getElementById('result-artist');
    const resultPlaylist = document.getElementById('result-playlists')

    // function requestApi(searchTerm) {
    //     const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((result) => displayResults(result))
    // }

    function requestApi(searchTerm) {
        const url = `http://localhost:3000/artists`
        fetch(url)
            .then((response) => response.json())
            .then((result) => filter(searchTerm, result))
    }

    function filter(searchTerm, results) {
        const resultFilter = results.filter((item) => {
            const term = item.name.toLowerCase();
            return term.includes(searchTerm)
        })
        displayResults(resultFilter);
    }


    function displayResults(result) {
        resultPlaylist.classList.add('hidden');
        
        result.forEach(element => {
            const container = document.createElement(`div`);
            container.classList.add(`artist-card`);
            container.setAttribute('id', element.id);
    
            container.innerHTML = `
                <div class="card-img">
                    <img class="artist-img" src="${element.urlImg}"/>
                    <div class="play">
                        <span class="fa fa-solid fa-play" />
                    </div>
                </div>
                <div class="card-text">
                    <a title="${element.name}" class="vst" href=""></a>
                        <span class="artist-name" >${element.name}</span>
                        <span class="artist-categorie">Artista</span>
                    </a>
                </div>
            `
    
            resultsArtist.appendChild(container);
        });

    }

    searchInput.addEventListener('input', function() {
        resultsArtist.innerHTML = ``;

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            resultPlaylist.classList.remove('hidden');
            resultsArtist.classList.add('hidden');
            return
        }
        requestApi(searchTerm)
    });