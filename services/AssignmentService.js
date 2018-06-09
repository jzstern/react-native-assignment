let _singleton = Symbol();

const localURL = "http://localhost:8080";


class AssignmentService {
	constructor(singletonToken) {
		if (_singleton !== singletonToken)
			throw new Error('Cannot instantiate directly.');
	}

	static get instance() {
		if (!this[_singleton])
			this[_singleton] = new AssignmentService(_singleton);
		return this[_singleton]
	}
}

export default AssignmentService;