var dataStorage;

function store(data) {
  dataStorage = data;
}

function retrieve() {
  return dataStorage;
}

exports.store = store;
exports.retrieve = retrieve;
