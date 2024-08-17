const { default: axios } = require('axios');

const dummyItems = [
];



const injectDummyData = () => {
    try {
        // dummyItems.forEach(async (item) => {
        //     console.log(item);
        //     await axios.post('http://localhost:3040/api/products', item);
        //     console.log(item.name, " - was added");
        // })

        axios.get('http://localhost:3040/api/products').then((res) => {
            console.log(res.data.length);
        })
        console.log(dummyItems.length, ' - Dummy data successfully added!');
    } catch (error) {
        console.error('Error adding dummy data:', error);
    }
};

injectDummyData();