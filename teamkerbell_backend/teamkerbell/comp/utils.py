from django.core.mail import send_mail
from django.conf import settings
import base64
from io import BytesIO
import requests
from django.core.mail import EmailMultiAlternatives
def send_team_matched_email(team_members, comp_name):
    # 이미지 다운로드
    response = requests.get("https://teamkerbellbucket.s3.ap-northeast-2.amazonaws.com/teamkerbellLofo.png")
    img_content = BytesIO(response.content).getvalue()
    img_base64 = base64.b64encode(img_content).decode('utf-8')
    
    for member in team_members:
        subject = '팀 매칭 완료'
        text_content = f'안녕하세요, {member.nickname}님!\n\n팀 매칭이 완료되었습니다. 이제 팀원들과 함께 공모전을 준비할 수 있습니다.\n\n감사합니다.'
        html_content = f'''
        <html>
            <body>
                <p>안녕하세요, {member.nickname}님!</p>
                <p>{member.nickname} 님이 신청하신 {comp_name}의 매칭이 완료되었습니다.</p>
                <p>이제 팀원들과 함께 공모전을 준비할 수 있습니다.</p>
                <p>지금 링크를 클릭해 확인해 보세요!</p>
                <p> http://teamkerbell.s3-website.ap-northeast-2.amazonaws.com/</p>
                <p>감사합니다.</p>
                <img src="data:image/jpeg;base64,{img_base64}" alt="image" width=538 height=126>
            </body>
        </html>
        '''
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [member.email]
        
        msg = EmailMultiAlternatives(subject, text_content, email_from, recipient_list)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
