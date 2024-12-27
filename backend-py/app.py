from flask import Flask, request, jsonify
from textblob import TextBlob

app=Flask(__name__)


@app.route('/analyze', methods=['POST'])

def analyze_sentiment():
    try:
        data=request.get_json()
        text=data['text']
        analysis = TextBlob(text)
        sentiment = 'positive' if analysis.sentiment.polarity > 0 else 'negative' if analysis.sentiment.polarity<0 else 'neutral'
        print("Sentiment: ", sentiment)
        return jsonify({'sentiment': sentiment})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__=="__main__":
    app.run(port=5001)