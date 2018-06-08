import React from 'react'
import {View, TextInput, Alert, ScrollView} from 'react-native'
import {FormLabel, FormInput, Text, Button} from 'react-native-elements'

class AssignmentWidget extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<ScrollView>
				<Text h1>Title</Text>
				<Text>This is where the description will go yadayada</Text>

				<Text h3>Essay answer</Text>
				<TextInput placeholder="Enter your essay here"/>

				<Text h3>Upload a file</Text>
				<Button title="Choose file"/><Text>No file chosen</Text>

				<Text h3>Submit a link</Text>
				<TextInput/>

				<View>
					<Button title="Cancel" backgroundColor="red"/>
					<Button title="Submit" backgroundColor="blue"/>
				</View>
			</ScrollView>
		)
	}
}