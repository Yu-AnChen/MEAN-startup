const initSystemSettings = (collection, doc) => {
    return !doc
    ? console.log(' ')
    : collection
        .insertOne({
            currentAdminSettingDocId: doc.insertedId,
            adminSettingIds: [doc.insertedId],

            _createdAt: new Date(),
            _updatedTraces: [doc.ops[0]._updatedTraces[0]]

        });
    // const adminDataStructure = require('./dataStructure/adminSetting');

    // const adminInitData = {
    //     eventName: 'Taiwan-TBA 2017',
    //     emailsOfAdmins: ['newevent@event.com']
    // };
    
    // const adminData = Object.assign({}, adminDataStructure, adminInitData);

    // const lastUpdate = {
    //     updatedAt: new Date(),
    //     updatedBy: adminInitData.emailsOfAdmins[0]
    // };
    // const data = Object.assign(
    //     {}, 
    //     adminData, 
    //     { _updatedTraces: [lastUpdate] },
    //     { _createdAt: new Date }
    // );

    // collection.

    // return collection
    //     .find({})
    //     .toArray()
    //     .then(result => 
    //         result.length
    //         ? console.log('')
    //         : collection.insertOne(data)
    //     )
    //     .then(() => console.log('adminSettingsInitData initiated'));

};

module.exports = initSystemSettings;