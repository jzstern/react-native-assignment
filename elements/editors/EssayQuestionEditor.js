import React from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import {Button, Text} from 'react-native-elements'

export default class EssayQuestionEditor extends React.Component {
	static navigationOptions = {title: 'Essay Question  '}
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			points: 20,
		}

	}

	componentDidMount() {
		const examId = this.props.navigation.getParam("examId")
		const title = this.props.navigation.getParam("title")
		const description = this.props.navigation.getParam("description")
		const points = this.props.navigation.getParam("points")
		// const questionId = this.props.navigation.getParam("questionId")

		// fetch("http://localhost:8080/api/essay/" + questionId)
		// 	.then(response => (response.json()))
		// 	.then(questions => {
		// 		this.setState({questions})
		// 	})


		this.setState({
			examId: examId,
			title: title,
			description: description,
			points: points
			// questionId: questionId
		})
	}

	updateForm(newState) {
		this.setState(newState)
	}

	render() {
		return (
			<ScrollView>
				<View style={{padding: 20}}>
					<Text h3>{this.state.title}</Text>
					<Text h4>{this.state.points}pts</Text>

					<Text style={{padding: 10}}>{this.state.description}</Text>
					<TextInput placeholder="Write your essay here" multiline={true}
					           style={{padding: 10, height: 100, backgroundColor: 'white'}}/>

					<View style={{paddingTop: 10}}>
						<Button title="Cancel" backgroundColor="red"/>
						<Button title="Submit" backgroundColor="blue"/>
					</View>
				</View>
			</ScrollView>
		)
	}
}