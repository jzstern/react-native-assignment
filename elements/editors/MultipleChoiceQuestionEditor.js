import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import QuestionService from '../../services/QuestionService'

class MultipleChoiceQuestionEditor extends React.Component {
	static navigationOptions = { title: "Multiple Choice"}
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			points: 0,
		}

		this.questionService = QuestionService.instance
		this.create = this.create.bind(this)
		// this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	componentDidMount() {
		const examId = this.props.navigation.getParam("examId")
		const title = this.props.navigation.getParam("title")
		const description = this.props.navigation.getParam("description")
		const points = this.props.navigation.getParam("points")
		const mcId = this.props.navigation.getParam("mcId")

		this.setState({
			examId: examId,
			title: title,
			description: description,
			points: points,
			mcId: mcId
		})
	}

	create() {
		var mcQuestion = {
			type: 'MultipleChoice',
			title: this.state.title,
			description: this.state.description,
			points: this.state.points
		}

		this.questionService.createMultipleChoiceQuestion(mcQuestion, this.state.examId)
			.then(() => this.props.navigation.goBack())
	}

	delete() {
		this.questionService.deleteMultipleChoiceQuestion(this.state.mcId.toString())
			.then(() => this.props.navigation.goBack())
	}

	updateForm(newState) {
		this.setState(newState)
	}

	render() {
		return(
			<View>
				<FormLabel>Title</FormLabel>
				<FormInput onChangeText={title => this.updateForm({title: title})}
				           placeholder="Enter a question title"
				           value={this.state.title}/>
				{/*<FormValidationMessage>*/}
					{/*Title is required*/}
				{/*</FormValidationMessage>*/}

				<FormLabel>Description</FormLabel>
				<FormInput onChangeText={description => this.updateForm({description: description})}
				           placeholder="Enter a description"
				           value={this.state.description}
				           style={{padding: 20, backgroundColor: "white"}}/>
				{/*<FormValidationMessage>*/}
					{/*Description is required*/}
				{/*</FormValidationMessage>*/}

				<FormLabel>Choices</FormLabel>
				<FormInput onChangeText={text => this.updateForm({options: text})}/>

				<Button	title="Create" onPress={() => this.create()} backgroundColor="green" style={{paddingTop: 10}}/>
				<Button	title="Delete" onPress={() => this.delete()} backgroundColor="red" style={{paddingTop: 10}}/>

				<Text h3>Preview</Text>
				<Text h2>{this.state.title}</Text>
				<Text>{this.state.description}</Text>
			</View>
		)
	}
}

export default MultipleChoiceQuestionEditor