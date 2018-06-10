import React, {Component} from 'react'
import {View, Alert, ScrollView, Button} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class WidgetList extends Component {
	static navigationOptions = {title: 'Widgets'}
	constructor(props) {
		super(props)
		this.state = {
			widgets: [],
			courseId: 1,
			moduleId: 1,
			lessonId: 1,
			points: 0
		}
	}

	componentDidMount() {
		const {navigation} = this.props;
		const lessonId = navigation.getParam("lessonId")

		this.setState({lessonId: lessonId}, () => {
			fetch("http://localhost:8080/api/lesson/" + lessonId + "/widget")
				.then(response => {
					return response.json()
				})
				.then(widgets => {
					this.setState({widgets})
					console.log(widgets)
				})
		})

		console.log('widgets: ' + this.state.widgets)
	}

	render() {
		return(
			<ScrollView style={{padding: 15}}>
				{this.state.widgets.map((widget, index) => (
						<ListItem
							onPress={() => this.props.navigation
								.navigate("QuestionList", {
									examId: widget.id,
									name: widget.name,
									description: widget.description,
									lessonId: this.state.lessonId})}
							key={index}
							subtitle={widget.description}
							title={widget.title}/>))}

				<Button title="Create Assignment"
				        onPress={() => this.props.navigation
					        .navigate('AssignmentWidget', {
						        lessonId: state.lessonId
					        })}/>
				<Button title="Create Exam"
				        onPress={() => this.props.navigation
					        .navigate('Exam', {
						        lessonId: this.state.lessonId
					        })}/>
			</ScrollView>
		)
	}
}
export default WidgetList