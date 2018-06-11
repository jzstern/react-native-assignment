import React from 'react'
import {Text, View, StatusBar, ScrollView} from 'react-native'
import FixedHeader from './elements/FixedHeader'
import ExamWidget from './components/ExamWidget'
import QuestionTypeButtonGroupChooser from "./elements/QuestionTypeButtonGroupChooser"
import QuestionTypePicker from "./elements/QuestionTypePicker"
import TrueFalseQuestionEditor from './elements/editors/TrueFalseQuestionEditor'
import createStackNavigator from "react-navigation/src/navigators/createStackNavigator"
import {Button} from "react-native-elements"
import Icons from "./elements/Icons";
import CourseList from "./components/CourseList"
import ModuleList from "./components/ModuleList"
import LessonList from "./components/LessonList"
import WidgetList from "./components/WidgetList"
import QuestionList from "./components/QuestionList"
import MultipleChoiceQuestionEditor from "./elements/editors/MultipleChoiceQuestionEditor"
import EssayQuestionEditor from "./elements/editors/EssayQuestionEditor"
import FillInTheBlankQuestionEditor from "./elements/editors/FillInTheBlankQuestionEditor"
import AssignmentWidget from "./components/AssignmentWidget"


class Home extends React.Component {
	static navigationOptions = {
		title: 'Home'
	}
	constructor(props) {
		super(props)
	}
	render() {
		return(
      <ScrollView>
        <StatusBar barStyle="light-content"/>
        <FixedHeader/>

        <Button title="Courses"
                onPress={() => this.props.navigation
					        .navigate('CourseList') } />
        {/*<Button title="Go to Screen X"*/}
                {/*onPress={() => this.props.navigation*/}
					        {/*.navigate('ScreenX') } />*/}
        {/*<Button title="Go to Screen A"*/}
                {/*onPress={() => this.props.navigation*/}
					        {/*.navigate('ScreenA') } />*/}
        {/*<Button title="Go to Screen B"*/}
                {/*onPress={() => this.props.navigation*/}
					        {/*.navigate('ScreenB') } />*/}

        {/*<TrueFalseQuestionEditor/>*/}
        {/*<QuestionTypeButtonGroupChooser/>*/}
        {/*<QuestionTypePicker/>*/}
        {/*<Exam/>*/}
      </ScrollView>
		)
	}
}

const App = createStackNavigator({
	Home,
	CourseList,
	ModuleList,
	LessonList,
	WidgetList,
	QuestionList,
	TrueFalseQuestionEditor,
	MultipleChoiceQuestionEditor,
	EssayQuestionEditor,
	FillInTheBlankQuestionEditor,
	ExamWidget,
	AssignmentWidget
})

export default App