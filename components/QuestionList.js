import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import ExamService from "../services/AssignmentService"

class QuestionList extends Component {
	static navigationOptions = {title: 'Questions'}
	constructor(props) {
		super(props)
		this.state = {
			examId: '',
			title: '',
			description: '',
			questions: [],
			questionType: 'MC'
		}

		this.examService = ExamService.instance
		this.createQuestion = this.createQuestion.bind(this)
	}

	componentDidMount() {
		const {navigation} = this.props
		const examId = navigation.getParam("examId")
		const title = this.props.navigation.getParam("title")
		const description = this.props.navigation.getParam("description")
		const lessonId = this.props.navigation.getParam("lessonId")
		const points = this.props.navigation.getParam("points")

		this.setState({
			examId: examId,
			title: title,
			description: description,
			lessonId: lessonId,
			points: points.toString()
		})

		// this.examService.findAllQuestionsForExam(examId)
		// 	.then(questions => this.setState(questions))

		fetch("http://localhost:8080/api/exam/" + examId + "/question")
			.then(response => (response.json()))
			.then(questions => this.setState({questions}))
	}

	createQuestion() {
		let examId = this.state.examId

		if (this.state.questionType === "MC") {
			this.props.navigation.navigate('MultipleChoiceQuestionEditor', {examId: examId})
		}
		else if (this.state.questionType === "TF") {
			this.props.navigation.navigate('TrueFalseQuestionEditor', {examId: examId})
		}
		else if (this.state.questionType === "ES") {
			this.props.navigation.navigate('EssayQuestionEditor', {examId: examId, points: 0})
		}
		else if (this.state.questionType === "FB") {
			this.props.navigation.navigate('FillInTheBlankQuestionEditor', {examId: examId})
		}
	}

	render() {
		return(
			<View style={{padding: 15}}>
				{this.state.questions.map(
					(question, index) => (
						<ListItem
							onPress={() => {
								console.log('points from QuestionList: ' + question.points)

								if (question.type === "TrueFalse")
									this.props.navigation
										.navigate("TrueFalseQuestionEditor", {
											questionId: question.id,
											examId: this.state.examId,
											tfId: question.id,
											title: question.title,
											description: question.description,
											points: question.points
										})
								if (question.type === "MultipleChoice")
									this.props.navigation
										.navigate("MultipleChoiceQuestionEditor", {
											questionId: question.id,
											examId: this.state.examId,
											mcId: question.id,
											title: question.title,
											description: question.description,
											points: question.points
										})
								if (question.type === "Essay")
									this.props.navigation
										.navigate("EssayQuestionEditor", {
											questionId: question.id,
											examId: this.state.examId,
											essayId: question.id,
											title: question.title,
											description: question.description,
											points: question.points
										})
								if (question.type === "FillInTheBlank")
									this.props.navigation
										.navigate("FillInTheBlankQuestionEditor", {
											questionId: question.id,
											examId: this.state.examId,
											fillId: question.id,
											title: question.title,
											description: question.description,
											points: question.points,
											answers: question.answers
										})
							}}
							key={index}
							subtitle={question.description}
							title={question.title}/>))}

				<View>
					<Picker onValueChange={(itemValue, itemIndex) => this.setState({questionType: itemValue})}
					        selectedValue={this.state.questionType}>
						<Picker.Item value="MC" label="Multiple choice" />
						<Picker.Item value="ES" label="Essay" />
						<Picker.Item value="TF" label="True or false" />
						<Picker.Item value="FB" label="Fill in the blanks" />
					</Picker>
				</View>

				<Button title="Create Question"
				        backgroundColor="blue"
				        style={{paddingTop: 10}}
				        onPress={() => this.createQuestion()}/>
			</View>
		)
	}
}
export default QuestionList