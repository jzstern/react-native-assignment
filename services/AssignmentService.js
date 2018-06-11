let _singleton = Symbol()

const localURL = "http://localhost:8080"
const prodURL = "https://stern-webdev-2018.herokuapp.com/"


class AssignmentService {
	constructor(singletonToken) {
		if (_singleton !== singletonToken)
			throw new Error('Cannot instantiate directly.')
	}

	static get instance() {
		if (!this[_singleton])
			this[_singleton] = new AssignmentService(_singleton)
		return this[_singleton]
	}

	createAssignment(assignment, lessonId) {
		let url = localURL + "/api/lesson/" + lessonId + "/assignment"

		return fetch(url, {
			body: JSON.stringify(assignment),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		}).then(response => (
			response.json()
		))
	}

	deleteAssignment(assignmentId) {
		let url = localURL + "/api/assignment/" + assignmentId
		return fetch(url, {
			method: 'DELETE'
		})
	}
}

export default AssignmentService