let _singleton = Symbol();

const localURL = "http://localhost:8080"

class QuestionService {
	constructor(singletonToken) {
		if (_singleton !== singletonToken)
			throw new Error('Cannot instantiate directly.')
	}

	static get instance() {
		if (!this[_singleton])
			this[_singleton] = new QuestionService(_singleton)
		return this[_singleton]
	}

	createEssayQuestion(essay, examId) {
		let url = localURL + "/api/exam/" + examId + "/essay"

		return fetch(url, {
			body: JSON.stringify(essay),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
	}

	deleteEssayQuestion(essayId) {
		let url = localURL + "/api/essay/" + essayId;
		return fetch(url, {
			method: 'DELETE'
		})
	}
}

export default QuestionService