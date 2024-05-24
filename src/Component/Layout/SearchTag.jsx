import _ from 'lodash'
import { Form, Input, Avatar, List } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { searchTask } from '@/services/task'
import { useDispatch } from 'react-redux'
import { openModal } from '@/redux/modal'
const {VITE_ORIGIN} = import.meta.env;

export default function SearchTask(){
    const [listTask, setListTask] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        function closeSearchPopup(e){
            setListTask([])
        }
        window.addEventListener('click', closeSearchPopup)

        return ()=>{
            window.removeEventListener('click', closeSearchPopup)
        }
    }, [])

    const onChange = useCallback(_.debounce(async (e)=>{
        let txt = e.target.value.trim()
        try {
            if(txt){
                let data = await searchTask(txt)
                data = data.data
                
                setListTask(data)
            }
        } catch (error) {
            console.log(error);
        }
    }, 1000))
    const handleClick = (item)=>{
        dispatch(openModal(item))
    }
    let result = (
        listTask.length > 0 ? <List
                itemLayout="horizontal"
                dataSource={listTask}
                style={{
                    position: 'fixed',
                    top: '50px',
                    width: '300px',
                    zIndex: 2,
                    background: 'white'
                }}
                
                renderItem={(item, index) => (
                <List.Item
                    onClick={(e)=>{
                        e.stopPropagation()
                        setListTask([])
                        handleClick(item)
                    }}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={VITE_ORIGIN + item?.attributes?.image?.data?.attributes?.url} />}
                    title={item?.id}
                    description={item?.attributes?.title}
                    />
                </List.Item>
                )}
            /> : null
    )

    return (
        <Form
            name='searchTaskForm'
        >
            <div className="board-search">
                <Form.Item
                    onChange={onChange}
                    style={{marginBottom: 0, position: 'relative'}}
                >
                    <Input type="search" className="board-search-input" aria-label="Board Search" placeholder='Tìm kiếm ...' />
                </Form.Item>
                <i className="fas fa-search search-icon" aria-hidden="true"></i>
            </div>
            {result}
        </Form>
    )
}