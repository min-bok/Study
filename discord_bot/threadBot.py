import os
import discord
import pandas as pd
from datetime import datetime

client = discord.Client(intents=discord.Intents.default())

channel_id = 1191970471093215282
token = "MTEwNTcyNjY0NjAwNDIzNjMzOQ.GZKTZi.qOEM0QGdyC9vBMUs6oMv6KR1oxuiCXwFxDrZXE"

def merge(df1, df2):
    df = pd.merge(df1, df2, how='outer',on='이름')
    return df

async def make_df(threads,df) :
    if len(threads) == 0:
        print("🚨해당 채널에는 스레드가 존재하지 않습니다.🚨")

    if threads:
        count=0

        for th in threads:
            name_list = []
            name_dict = {}
            total_list = []
            thread_list = []

            total_list.append(th) # 스레드 이름
            total_list.append(str(th.archive_timestamp)[0:19]) # 스레드 생성 날짜
            
            cnt = 0
            async for msg in th.history(limit=200):
                name = msg.author.global_name # 스레드에 메시지 올린 유저 이름
                name_list.append(name)
                cnt += 1

            for key in name_list:
                name_dict[key] = name_dict.get(key, 0) + 1
            total_list.append(name_dict)
            thread_list.append(total_list)

            globals()['df_{}'.format(th)] = pd.DataFrame({
                "이름" : total_list[-1].keys(),
                total_list[0] : 1
            })
            
            df = merge(df,globals()['df_{}'.format(th)])
            count+=1

        df["총점"]=df.sum(axis=1, skipna=True)
        this_month = datetime.today().month
        df.to_csv(f"[{this_month}월 결과] 모두연 스레드 집계.xlsx")
        print(f'✨{this_month}월 스레드 점수 집계 완료✨')
    else:
        print("🚨스레드 집계시 문제 발생🚨")

@client.event
async def on_ready():
    print("🤖스레드 점수 채점봇 구동중🤖")
    print("=============================")

    channel = client.get_channel(channel_id)
    threads = channel.threads

    df = pd.read_excel("모두연 스레드 집계.xlsx")

    start_date = input("수집 시작일을 입력해주세요(형식 : yyyy-mm-dd) : ")
    end_date = input("수집 종료일을 입력해주세요(형식 : yyyy-mm-dd) : ")

    s = [row for row in threads if str(start_date) <= str(row.archive_timestamp)[0:10]<= str(end_date)]

    await make_df(s,df)

client.run(token)