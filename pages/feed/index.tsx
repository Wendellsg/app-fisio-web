import styles from './Feed.module.css'
import ActivityCard from '../../src/components/ActivityCard/ActivityCard'
export default function Feed(){
    return(
        <div className={styles.feedContainer}>
            <h2>Feed de Atividades</h2>
            <div className={styles.activityList}>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            <ActivityCard index={1} activity={''}/>
            </div>

        </div>
    )
}