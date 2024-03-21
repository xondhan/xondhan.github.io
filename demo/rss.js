function fetchRSS() {
    const rssFeedUrl = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";

    fetch(rssFeedUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');
            const rssFeed = document.getElementById('rss-feed');

            
            const limitedItems = Array.from(items).slice(0, 13);

            limitedItems.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const summary = item.querySelector('description').textContent;

                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link;
                a.textContent = title;
                a.target = "_blank";
                li.appendChild(a);

                const p = document.createElement('p');
                p.textContent = summary;
                li.appendChild(p);

                rssFeed.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching RSS feed:', error));
}

// Call the fetchRSS function to load the RSS feed
fetchRSS();
