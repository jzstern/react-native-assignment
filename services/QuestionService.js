let _singleton = Symbol();

const localURL = "http://localhost:8080"
const prodURL = "https://stern-webdev-2018.herokuapp.com/"

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

	createFillInTheBlankQuestion(fillQuestion, fillId) {
		let url = localURL + "/api/exam/" + fillId + "/fill"

		return fetch(url, {
			body: JSON.stringify(fillQuestion),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
	}

	deleteFillInTheBlankQuestion(fillId) {
		let url = localURL + "/api/fill/" + fillId

		return fetch(url, {
			method: 'DELETE'
		})
	}

	createTrueFalseQuestion(tfQuestion, tfId) {
		let url = localURL + "/api/exam/" + tfId + "/truefalse"

		return fetch(url, {
			body: JSON.stringify(tfQuestion),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
	}

	deleteTrueFalseQuestion(tfId) {
		let url = localURL + "/api/truefalse/" + tfId

		return fetch(url, {
			method: 'DELETE'
		})
	}

	createMultipleChoiceQuestion(mcQuestion, examId) {
		let url = localURL + "/api/exam/" + examId + "/choice"

		return fetch(url, {
			body: JSON.stringify(mcQuestion),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
	}

	deleteMultipleChoiceQuestion(mcId) {
		let url = localURL + "/api/choice/" + mcId

		return fetch(url, {
			method: 'DELETE'
		})
	}

	createEssayQuestion(essayQuestion, examId) {
		let url = localURL + "/api/exam/" + examId + "/essay"

		return fetch(url, {
			body: JSON.stringify(essayQuestion),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
	}

	updateEssayQuestion(essayQuestion, essayId) {
		let url = localURL + "/api/essay/" + essayId

		return fetch(url, {
			body: JSON.stringify(essayQuestion),
			headers: {
				'content-type' : 'application/json'
			},
			method: 'PUT'
		})
	}

	deleteEssayQuestion(essayId) {
		let url = localURL + "/api/essay/" + essayId

		return fetch(url, {
			method: 'DELETE'
		})
	}
}

export default QuestionService