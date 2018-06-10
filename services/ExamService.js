let _singleton = Symbol()

const localURL = "http://localhost:8080"

class ExamService {
	constructor(singletonToken) {
		if (_singleton !== singletonToken)
			throw new Error('Cannot instantiate directly.')
	}

	static get instance() {
		if (!this[_singleton])
			this[_singleton] = new ExamService(_singleton)
		return this[_singleton]
	}

	createExam(exam, lessonId) {
		let url = localURL + "/api/lesson/" + lessonId + "/exam"

		return fetch(url, {
			body: JSON.stringify(exam),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		}).then(response => (
			response.json()
		))
	}

	updateExam(exam, examId) {
		let url = localURL + "/api/exam/" + examId
		return fetch(url, {
			body: JSON.stringify(exam),
			headers: {
				'content-type': 'application/json'
			},
			method: 'PUT'
		}).then(response => (response.json()))
	}

	deleteExam(examId) {
		let url = localURL + "/api/exam/" + examId
		return fetch(url, {
			method: 'DELETE'
		})
	}

	findAllQuestionsForExam(examId) {
		return fetch(localURL + '/api/exam/' + examId + '/question')
			.then(response => (response.json()))
	}
}

export default ExamService