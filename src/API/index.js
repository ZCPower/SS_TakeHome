;


export async function searchItem(q, page) {
    const url = `https://scmq7n.a.searchspring.io/api/search/search.json?siteId=scmq7n&resultsFormat=native&q=${q}&redirectResponse=minimal&page=${page}&resultsPerPage=24`
    try {
        const response = await fetch(url, {
            method: 'GET', headers: {
                accept: 'application/json'
            }
        });

        const data = response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


