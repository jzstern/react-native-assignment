import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class QuestionList extends Component {
	static navigationOptions = {title: 'Questions'}
	constructor(props) {
		super(props)
		this.state = {
			questions: [],
			examId: 1
		}
	}

	componentDidMount() {
		const {navigation} = this.props;
		const examId = navigation.getParam("examId")

		fetch("http://localhost:8080/api/exam/" + examId + "/question")
			.then(response => (response.json()))
			.then(questions => this.setState({questions}))
	}


	render() {
		return(
			<View style={{padding: 15}}>
				{this.state.questions.map(
					(question, index) => (
						<ListItem
							onPress={() => {
								if(question.type === "TrueFalse")
									this.props.navigation
										.navigate("TrueFalseQuestionEditor", {questionId: question.id})
								if(question.type === "MultipleChoice")
									this.props.navigation
										.navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
								if(question.type === "Essay")
									this.props.navigation
										.navigate("EssayQuestionEditor", {
											questionId: question.id,
											examId: this.state.examId,
											essayId: question.id,
											title: question.title,
											description: question.description,
											points: question.points
										})
							}}
							key={index}
							subtitle={question.description}
							title={question.title}/>))}
			</View>
		)
	}
}
export default QuestionList