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

	createEssayQuestion(essayQuestion, examId) {
		let url = localURL + "/api/exam/" + examId + "/essay"

		console.log('examId: ' + examId)
		console.log(url)

		console.log(essayQuestion)

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

		console.log('called updateEssayQuestion from QuestionService!')
		console.log(essayQuestion)

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