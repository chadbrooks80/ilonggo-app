import LessonsList from "./LessonsList";
import LessonDetail from "./LessonDetail";
import './FlashcardPage.css';

const FlashcardPage = () => {
    return (
        <div className="flashcard-container">
            <div className="lessons-list">
                <LessonsList />
            </div>
            <div className="lesson-detail">
                <LessonDetail />
            </div>
        </div>
    );
}

export default FlashcardPage;
