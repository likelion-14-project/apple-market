import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import TopNav from "../ui/TopNav";
import BackButton from "../ui/BackButton";
import ModalButton from "../ui/ModalButton";
import Modal from "../modal/Modal";
import AlertModal from "../modal/AlertModal";
import InputFooter from "../ui/InputFooter";
import { useNavigate } from "react-router-dom";

const Container = styled.main`
    background-color: #f2f2f2;
    position: fixed;
    min-width: 100%;
    height: calc(100% - 108px);
`;

const ChatRoomUl = styled.ul`
    box-sizing: border-box;
    margin: 10px 28px;
    img {
        width: 41px;
        height: 41px;
    }
`;

const ChatSenderLi = styled.li`
    display: flex;
    align-items: flex-end;
    padding: 10px;
`;

const ChatSenderTxt = styled.p`
    border-radius: 0 5px 5px 5px;
    border: 1px solid #c4c4c4;
    background-color: white;
    padding: 7px;
    margin-left: 12px;
`;

const ChatMeLi = styled.li`
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    padding: 10px;
`;

const ChatMeLiTxt = styled.p`
    border-radius: 0 5px 5px 5px;
    border: 1px solid #ffc776;
    background-color: #ffc776;
    padding: 7px;
`;

const ChatRoomTime = styled.p`
    color: #767676;
    font-size: 12px;
    padding: 6px;
`;

function Chat() {
    const [chat, setChat] = useState("");
    const [chatlist, setChatList] = useState([]);
    const { user } = useAuthContext();

    const [disabled, setDisabled] = useState(true);
    const [modal, setModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);

    const navigate = useNavigate();

    const modalMenuList = [
        {
            content: "설정 및 개인정보",
            onClick: () => {},
        },
        {
            content: "로그아웃",
            onClick: () => {
                setAlertModal(true);
            },
        },
    ];
    const alertButton = {
        content: "로그아웃",
        onClick: () => {
            localStorage.removeItem("token");
            navigate("/");
        },
    };

    let sendChat = (e) => {
        const copyChatlist = [...chatlist];
        copyChatlist.push(chat);
        setChatList(copyChatlist);
        setChat("");
    };

    const getNow = () => {
        return "12:41";
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        return hours + ":" + minutes;
    };

    return (
        <>
            <TopNav
                leftChild={<BackButton />}
                centerChild="레고마켓 관리자"
                rightChild={<ModalButton onClick={() => setModal(!modal)} />}
            />
            <Container>
                <ChatRoomUl>
                    <ChatSenderLi>
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/images/LegoDefaultImage.png"
                            }
                        />
                        <ChatSenderTxt>안녕하세요!!</ChatSenderTxt>
                        <ChatRoomTime>{getNow()}</ChatRoomTime>
                    </ChatSenderLi>

                    {chatlist.map((chatArr, i) => {
                        return (
                            <ChatMeLi key={i}>
                                <ChatMeLiTxt>{chatArr}</ChatMeLiTxt>
                                <ChatRoomTime>{getNow()}</ChatRoomTime>
                            </ChatMeLi>
                        );
                    })}
                </ChatRoomUl>
            </Container>
            <InputFooter
                img={user.image}
                placeholder="메세지 입력하기..."
                value={chat}
                onChange={(e) => {
                    setChat(e.target.value);
                    e.target.value.length > 0
                        ? setDisabled(false)
                        : setDisabled(true);
                }}
                onClick={sendChat}
                disabled={disabled}
                btnTxt="게시"
            />
            <Modal
                modal={modal}
                setModal={setModal}
                modalMenuList={modalMenuList}
            />
            <AlertModal
                alertModal={alertModal}
                setAlertModal={setAlertModal}
                setModal={setModal}
                content={"로그아웃하시겠어요?"}
                alertButton={alertButton}
            />
        </>
    );
}

export default Chat;
