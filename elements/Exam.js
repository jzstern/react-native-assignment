import React, {Component} from 'react'
import {View} from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import ExamService from '../services/ExamService';

const questions = [
	{	title: 'Question 1', subtitle: 'Multiple choice',
		icon: 'list'},
	{	title: 'Question 2', subtitle: 'Fill-in the blanks',
		icon: 'code'},
	{	title: 'Question 3', subtitle: 'True or false',
		icon: 'check'},
	{	title: 'Question 4', subtitle: 'Essay',
		icon: 'subject'}]

export default class Exam extends Component {
	constructor(props) {
		super(props)
		this.state = {
			examId: '',
			title: '',
			description: '',
			questions: []
		}

		this.examService = ExamService.instance
	}

	componentDidMount() {
		const examId = this.props.navigation.getParam("examId")
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

		this.examService.findAllQuestionsForExam(examId)
			.then(questions => this.setState({questions: questions}))
	}

	render() {
		return (
			<View style={{padding: 15}}>
				<Text h2>Lists</Text>
				{questions.map((question, index) => (
					<ListItem
						key={index}
						icon={question.icon}
						title={question.title}
						subtitle={question.subtitle}/>
				))}
			</View>
		)
	}
}

