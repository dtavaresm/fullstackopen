const Header = ({ courseName }) => {
    return (
        <>
            <h1>
                {courseName}
            </h1>
        </>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <>
            <p>
                {name} {exercises}
            </p>
        </>
    )
}

const Total = ({ courseParts }) => {
    let total = courseParts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <>
            <b>
                Total of exercises {total}
            </b>
        </>
    )
}

const Content = ({ courseName, courseParts }) => {
    return (
        <>
            <Header courseName={courseName} />
            {courseParts.map(part =>
                <Part
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises} />
            )}
            <Total courseParts={courseParts} />
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Content courseName={course.name} courseParts={course.parts} />
        </>
    )
}

export default Course