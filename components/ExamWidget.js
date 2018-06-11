import React, {Component} from 'react'
import {ScrollView, TextInput, View} from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import ExamService from '../services/ExamService'
import {FormLabel, FormInput, Button} from "react-native-elements"

class ExamWidget extends Component {
	static navigationOptions = {title: 'Create Exam'}
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			description: '',
			points: 0
		}

		this.examService = ExamService.instance
		this.create = this.create.bind(this)
	}

	componentDidMount() {
		const {navigation} = this.props
		const lessonId = navigation.getParam("lessonId")

		this.setState({lessonId: lessonId})
	}

	create() {
		var exam = {
			widgetType: 'Exam',
			title: this.state.title,
			description: this.state.description,
			points: this.state.points
		}

		console.log('created')

		this.examService.createExam(exam, this.state.lessonId.toString())
			.then(() => this.props.navigation.goBack())
	}

	updateForm(newState) {
		this.setState(newState)
	}

	render() {
		return (
			<ScrollView style={{padding: 15}}>
				<FormLabel>Title</FormLabel>
				<FormInput onChangeText={title => this.updateForm({title: title})}
				           placeholder="Enter an exam title"
				           value={this.state.title}/>

				<FormLabel>Description</FormLabel>
				<TextInput onChangeText={description => this.updateForm({description: description})}
				           placeholder="Enter a description"
				           value={this.state.description}
				           backgroundColor="white"
				           style={{padding: 10}}/>

				<FormLabel>Points</FormLabel>
				<FormInput onChangeText={points => this.updateForm({points: points})}
				           value={this.state.points.toString()}/>

				<Button title="Cancel" onPress={() => this.props.navigation.goBack()} backgroundColor="red"/>
				<Button title="Create" onPress={() => this.create()} backgroundColor="green" style={{paddingTop: 10}}/>
			</ScrollView>
		)
	}
}

export default ExamWidget