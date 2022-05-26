async function getData(){
    const response = await fetch ('/api');
    const data = await response.json();
    console.log(data);

    for(let item of data){
        const root = document.createElement('div');
        const text = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        
        text.textContent = `text: ${item.text}`;
        geo.textContent = `location: ${item.lat}°,  ${item.long}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        
        root.append(text, geo, date);
        document.body.append(root);
    }
};
getData();