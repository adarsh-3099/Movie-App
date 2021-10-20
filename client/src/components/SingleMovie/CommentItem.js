import React from 'react'
import isEmpty from '../../validation/is_empty'

function CommentItem(post) {

    const { review } = post.post

    console.log(review)

    return (
        <div>
            {
                isEmpty(review) ? null: (
                 review.map((rev)=>(
                    <div>
                        <div className="text-left d-flex align-items-center px-md-5">
                            <div>
                                <img src={rev.avatar} className="rounded px-md-5" style={{height: '60px'}}/>
                                <p className="lead text-white px-md-5">{rev.name}</p>
                            </div>
                            <p className="lead text-white">{rev.text}</p>
                        </div>
                        <hr className="text-white" />
                    </div>
                ))
                )
            }
        </div>
    )
}

export default CommentItem
