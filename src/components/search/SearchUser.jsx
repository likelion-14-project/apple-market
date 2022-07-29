import React, { useCallback, useEffect} from "react";
import { useState } from "react";
import { searchUser} from "../../hooks/useAxios";
import SearchUserItem from "./SearchUserItem";
import TopNav from "../ui/TopNav";
import BackButton from "../ui/BackButton";
import { SearchInput, SearchDivWrap, ListWrap, MainContentsWrap } from "./SearchUser.style";

const SearchUseHook = () => {
    const [userList, setUserList] = useState();
    const [keyword, setKeyword] = useState("");

    const onChange = useCallback((e) => {
        setKeyword(e.target.value);
    },[]);

    useEffect(()=>{
        (async () => {
            const res = await searchUser(keyword);
            setUserList(res);
        })()
    },[keyword])

    return (
        <>
            <TopNav
                leftChild={<BackButton />}
                centerChild={<SearchInput placeholder="계정검색" onChange={onChange}></SearchInput>}
            />
            <MainContentsWrap>
                {userList ? (
                    <SearchDivWrap>
                        {userList?.data.map((v, i) => {
                            return (
                                <ListWrap key={i}>
                                    <SearchUserItem
                                        profileImg={v.image}
                                        userName={v.username}
                                        userId={v.accountname}
                                    />
                                </ListWrap>
                            );
                        })}
                    </SearchDivWrap>
                ) : (
                    <div> loading ....</div>
                )}
            </MainContentsWrap>
        </>
    );
};

export default SearchUseHook;
