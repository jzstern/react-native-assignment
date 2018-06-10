import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Button, Text, FormLabel, FormInput} from 'react-native-elements'
import QuestionService from '../../services/QuestionService'

export default class EssayQuestionEditor extends React.Component {
	static navigationOptions = {title: 'Essay Question '}
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			points: 0,
		}

		this.questionService = QuestionService.instance
		this.create = this.create.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	componentDidMount() {
		const examId = this.props.navigation.getParam("examId")
		const title = this.props.navigation.getParam("title")
		const description = this.props.navigation.getParam("description")
		const points = this.props.navigation.getParam("points")
		const essayId = this.props.navigation.getParam("essayId")
		// const questionId = this.props.navigation.getParam("questionId")

		this.setState({
			examId: examId,
			title: title,
			description: description,
			points: points,
			essayId: essayId
			// questionId: questionId
		})
	}

	create() {
		var essayQuestion = {
			type: 'Essay',
			title: this.state.title,
			description: this.state.description,
			points: this.state.points
		}

		this.questionService.createEssayQuestion(essayQuestion, this.state.examId)
			.then(() => this.props.navigation.goBack())
	}

	update() {
		var essayQuestion = {
			type: 'Essay',
			title: this.state.title,
			description: this.state.description,
			points: this.state.points
		}

		this.questionService.updateEssayQuestion(essayQuestion, this.state.essayId.toString())
			.then(() => this.props.navigation.goBack())
	}

	delete() {
		this.questionService.deleteEssayQuestion(this.state.essayId.toString())
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
					           placeholder="Enter an essay title"
					           value={this.state.title}/>

					<FormLabel>Description</FormLabel>
					<TextInput onChangeText={description => this.updateForm({description: description})}
					           placeholder="Enter a description"
					           value={this.state.description}
					           style={{padding: 20, backgroundColor: "white"}}/>

					<FormLabel>Points</FormLabel>
					<FormInput onChangeText={points => this.updateForm({points: points})} value={this.state.points.toString()}/>

					<Text h4 style={{paddingTop: 20}}>Preview</Text>
					<Text h3>{this.state.title}</Text>
					<Text h4>{this.state.points}pts</Text>

					<Text style={{padding: 10}}>{this.state.description}</Text>
					<TextInput placeholder="Write your essay here" multiline={true}
					           style={{padding: 10, height: 100, backgroundColor: 'white'}}/>

					<View style={{paddingTop: 10}}>
						<Button title="Delete" onPress={() => this.delete()} backgroundColor="red" style={{paddingTop: 10}}/>
						<Button title="Update" onPress={() => this.update()} backgroundColor="blue" style={{paddingTop: 10}}/>
						<Button title="Submit" onPress={() => this.create()} backgroundColor="green" style={{paddingTop: 10}}/>
					</View>
				</View>
			</ScrollView>
		)
	}
}