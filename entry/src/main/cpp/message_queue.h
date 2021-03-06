/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef FOUNDATION_CCRUNTIME_JSAPI_WORKER_MESSAGE_QUEUE_H
#define FOUNDATION_CCRUNTIME_JSAPI_WORKER_MESSAGE_QUEUE_H

//#include <mutex>
#include <queue>

using MessageDataType = void*;
class MessageQueue final {
public:
    void EnQueue(MessageDataType data);
    bool DeQueue(MessageDataType *data);
    bool IsEmpty() const;
    size_t GetSize() const
    {
        return queue_.size();
    }

private:
//    std::mutex queueLock_;
    std::queue<MessageDataType> queue_;
};
#endif // FOUNDATION_CCRUNTIME_JSAPI_WORKER_MESSAGE_QUEUE_H
