import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import QuestionService from '../../services/QuestionService'

class TrueFalseQuestionEditor extends React.Component {
	static navigationOptions = { title: "True False"}
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			points: 0,
			isTrue: true
		}

		this.questionService = QuestionService.instance
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
	}

	componentDidMount() {
		const examId = this.props.navigation.getParam("examId")
		const title = this.props.navigation.getParam("title")
		const description = this.props.navigation.getParam("description")
		const points = this.props.navigation.getParam("points")
		const tfId = this.props.navigation.getParam("tfId")

		this.setState({
			examId: examId,
			title: title,
			description: description,
			points: points,
			tfId: tfId
		})
	}

	create() {
		var tfQuestion = {
			type: 'TrueFalse',
			title: this.state.title,
			description: this.state.description,
			points: this.state.points
		}

		this.questionService.createTrueFalseQuestion(tfQuestion, this.state.examId)
			.then(() => this.props.navigation.goBack())
	}


	delete() {
		this.questionService.deleteTrueFalseQuestion(this.state.tfId.toString())
			.then(() => this.props.navigation.goBack())
	}

	updateForm(newState) {
		this.setState(newState)
	}

	render() {
		return(
			<View>
				<FormLabel>Title</FormLabel>
				<FormInput onChangeText={title => this.updateForm({title: title})}/>
				{/*<FormValidationMessage>*/}
					{/*Title is required*/}
				{/*</FormValidationMessage>*/}

				<FormLabel>Description</FormLabel>
				<FormInput onChangeText={description => this.updateForm({description: description})}/>
				{/*<FormValidationMessage>*/}
					{/*Description is required*/}
				{/*</FormValidationMessage>*/}

				<CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
				          checked={this.state.isTrue} title='Check if the answer is true'/>

				<Button	title="Create" onPress={() => this.create()} backgroundColor="green" style={{paddingTop: 10}}/>
				<Button	title="Delete" onPress={() => this.delete()} backgroundColor="red" style={{paddingTop: 10}}/>

				<Text h3>Preview</Text>
				<Text h2>{this.state.title}</Text>
				<Text>{this.state.description}</Text>

			</View>
		)
	}
}

export default TrueFalseQuestionEditor