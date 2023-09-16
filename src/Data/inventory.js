function generateUniqueId() {
    return Math.floor(Math.random() * 1000000);
}
const inventory = [
    {
        title: "Mug Coding Fuel",
        price: 14.99,
        img: "codingfuel",
        id: generateUniqueId(),
        stock: 10,

    },
    {
        title: "Mug CSS",
        price: 12.99,
        img: "cssmug",
        id: generateUniqueId(),
        stock: 10,

    },
    {
        title: "Mug JS",
        price: 13.99,
        img: "jsmug",
        id: generateUniqueId(),
        stock: 10,

    },
    {
        title: "Mug React",
        price: 14.99,
        img: "reactmug",
        id: generateUniqueId(),
        stock: 10,

    },
    {
        title: "Mug Love JS",
        price: 13.99,
        img: "lovejs",
        id: generateUniqueId(),
        stock: 10,

    },
    {
        title: "Mug Summer JS",
        price: 11.99,
        img: "jssummer",
        id: generateUniqueId(),
        stock: 10,

    },
];

export default inventory;