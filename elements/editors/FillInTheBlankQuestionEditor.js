import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Button, Text, FormLabel, FormInput} from 'react-native-elements'
import QuestionService from '../../services/QuestionService'

export default class FillInTheBlankQuestionEditor extends React.Component {
	static navigationOptions = {title: 'Fill In The Blank Question '}
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			points: 0,
			answers: []
		}

		this.questionService = QuestionService.instance
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
		this.addAnswer = this.addAnswer.bind(this)
		this.updateAnswer = this.updateAnswer.bind(this)
	}

	componentDidMount() {
		const examId = this.props.navigation.getParam("examId")
		const title = this.props.navigation.getParam("title")
		const description = this.props.navigation.getParam("description")
		const points = this.props.navigation.getParam("points")
		const fillId = this.props.navigation.getParam("fillId")
		const answers = this.props.navigation.getParam("answers")

		this.setState({
			examId: examId,
			title: title,
			description: description,
			points: points,
			fillId: fillId,
			answers: answers
		})
	}

	addAnswer() {
		/*var answers = [
			this.state.answers, {
			}
		]
		this.setState({answers: answers})*/

		console.log('Broken')
	}

	updateAnswer(answer, index) {
		// let answers = this.state.answers.filter(answer => {
		//
		// })
		// this.setState({variables: variables})

		console.log('Broken')
	}

	create() {
		var fillQuestion = {
			type: 'FillInTheBlank',
			title: this.state.title,
			description: this.state.description,
			points: this.state.points
		}

		this.questionService.createFillInTheBlankQuestion(fillQuestion, this.state.examId)
			.then(() => this.props.navigation.goBack())
	}

	delete() {
		this.questionService.deleteFillInTheBlankQuestion(this.state.fillId.toString())
			.then(() => this.props.navigation.goBack())
	}

	updateForm(newState) {
		this.setState(newState)
	}

	render() {
		return (
			<ScrollView>
				<View style={{padding: 20}}>

					<FormLabel>Title</FormLabel>
					<FormInput onChangeText={title => this.updateForm({title: title})}
					           placeholder="Enter a question title"
					           value={this.state.title}/>

					<FormLabel>Description</FormLabel>
					<TextInput onChangeText={description => this.updateForm({description: description})}
					           placeholder="Enter a description"
					           value={this.state.description}
					           style={{padding: 20, backgroundColor: "white"}}/>

					<FormLabel>Points</FormLabel>
					{/*<FormInput onChangeText={points => this.updateForm({points: points})} value={this.state.points.toString()}/>*/}
					<FormInput onChangeText={points => this.updateForm({points: points})}/>

					<Text h4 style={{paddingTop: 20}}>Preview</Text>
					<Text h3>{this.state.title}</Text>
					<Text h4>{this.state.points}pts</Text>

					<Text style={{padding: 10}}>{this.state.description}</Text>
					<TextInput placeholder="Write your true false question here" multiline={true}
					           style={{padding: 10, height: 100, backgroundColor: 'white'}}/>

					<FormLabel>Add Answer Fields</FormLabel>
						{/*{this.state.answers.map((answer, index) => (*/}
								{/*<FormInput value={answer.value}*/}
								           {/*key={index}*/}
								           {/*onChangeText={answer => this.updateAnswer(answer, index)}/>*/}
						{/*))}*/}

						<Button title="Create answer field"
						        onPress={() => this.addAnswer()}/>

					<Button title="Delete" onPress={() => this.delete()} backgroundColor="red" style={{paddingTop: 10}}/>
					<Button title="Create" onPress={() => this.create()} backgroundColor="green" style={{paddingTop: 10}}/>
				</View>
			</ScrollView>
		)
	}
}