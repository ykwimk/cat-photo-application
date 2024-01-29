const getRoot = async () => {
    return await fetch('https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/')
        .then(res => res.json())
        .catch(e => console.log(e));
}

const getId = async (id) => {
    return await fetch(`https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/${id}`)
        .then(res => res.json())
        .catch(e => console.log(e));
}