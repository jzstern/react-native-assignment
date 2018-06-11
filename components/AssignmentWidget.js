import React from 'react'
import {View, TextInput, Alert, ScrollView} from 'react-native'
import {FormLabel, FormInput, Text, Button} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService"

class AssignmentWidget extends React.Component {
	static navigationOptions = {title: 'Assignment'}
	constructor(props) {
		super(props)
		this.state = {
			lessonId: '',
			title: '',
			description: '',
			points: 0
		}
		this.assignmentService = AssignmentService.instance
		this.create = this.create.bind(this)
		this.delete = this.delete.bind(this)
	}

	componentDidMount() {
		const {navigation} = this.props;
		const lessonId = navigation.getParam("lessonId")
		const title = navigation.getParam("title")
		const description = navigation.getParam("description")
		const points = navigation.getParam("points")
		const assignmentId = navigation.getParam("assignmentId")

		this.setState({
			lessonId: lessonId,
			title: title,
			description: description,
			points: points,
			assignmentId: assignmentId
		})
	}

	create() {
		var assignment = {
			type: 'Assignment',
			title: this.state.title,
			description: this.state.description,
			points: this.state.points
		}

		this.assignmentService.createAssignment(assignment, this.state.lessonId.toString())
			.then(() => this.props.navigation.goBack())
	}

	delete() {
		this.assignmentService.deleteAssignment(this.state.lessonId.toString())
			.then(() => this.props.navigation.goBack())
	}

	updateForm(newState) {
		this.setState(newState);
	}

	render() {
		return (
			<ScrollView>
				<FormLabel>Title</FormLabel>
				<FormInput onChangeText={title => this.updateForm({title: title})}
				           placeholder="Enter an assignment title"
				           value={this.state.title}/>

				<FormLabel>Description</FormLabel>
				<View style={{padding: 10}}>
					<TextInput onChangeText={description => this.updateForm({description: description})}
					           placeholder="Enter a description"
					           value={this.state.description}
					           style={{backgroundColor: "white", padding: 10}}/>
				</View>

				<FormLabel>Points</FormLabel>
				<FormInput onChangeText={points => this.updateForm({points: points})}
				           value={this.state.points.toString()}/>


				<View style={{padding: 10}}>
					<Text h4 style={{paddingTop: 20}}>Preview</Text>
					<Text h3>{this.state.title}</Text>
					<Text h4>{this.state.points}pts</Text>

					<Text style={{padding: 10}}>{this.state.description}</Text>
					<Text style={{paddingTop: 20, paddingBottom: 20}}>{this.state.description}</Text>

					<Text h3>Essay Answer</Text>
					<TextInput multiline={true} style={{padding: 10, height: 100, backgroundColor: 'white'}}/>

					<Text h3>Upload a file</Text>
					<View>
						<Button title="Choose file"
						        // style={{width: 300}}
						/>
						<Text style={{paddingLeft: 10}}>No file chosen</Text>
					</View>

					<Text h3>Submit a link</Text>
					<View style={{padding: 20}}>
						<TextInput style={{padding: 10, backgroundColor: 'white'}}/>
					</View>

					<Button title="Delete" onPress={() => this.delete()} backgroundColor="red" style={{paddingTop: 10}}/>
					<Button title="Submit" onPress={() => this.create()} backgroundColor="green" style={{paddingTop: 10}}/>
				</View>
			</ScrollView>
		)
	}
}

export default AssignmentWidget