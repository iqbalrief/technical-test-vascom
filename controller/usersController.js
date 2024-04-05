const{User } = require("../models");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
    const { username, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        role,
        password:hashPassword,
        email,
    })

    return res.status(201).json({ data: newUser, message: "signup success" });
    } catch (error) {
       console.log(error);
    }
}

const signIn = async (req, res) => {
    try {
        const {email, password, role} = req.body
        const users = await User.findOne({
            where: {
                email
              },
        })

            
    if (!users) {
        return res.status(404).json({ message: 'Invalid Credential' });
      }
      const isPasswordMatch = await bcrypt.compare(password, users.password);
      if (!isPasswordMatch) {
        return res.status(404).json({ message: 'Invalid Credential' });
      }
      const token = jwt.sign({ id: users.id, role: users.role }, process.env.JWT_SECRETKEY);
      return res.status(201).json({
        accessToken: token,
        dataUser: {
          message: "Signin Success",
          id: users.id,
          username: users.username,
        },
      });
    
    } catch (error) {
     console.log(error);
     }
}



const getAllByUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ message: 'Daftar pengguna berhasil ditemukan.', data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengguna.' });    }
 }

 const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        res.status(200).json({ message: 'Detail pengguna berhasil ditemukan.', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengguna.' });
    }
};

const updateUsersByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await user.update({ username, email, password: hashedPassword, role });
        } else {
            await user.update({ username, email, role });
        }
        res.status(200).json({ message: 'Informasi pengguna berhasil diperbarui.', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui informasi pengguna.' });
    }
};


const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await user.update({ username, email, password: hashedPassword });
        } else {
            await user.update({ username, email, role });
        }
        res.status(200).json({ message: 'Informasi pengguna berhasil diperbarui.', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui informasi pengguna.' });
    }
};


const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.status(200).json({ message: 'Pengguna berhasil dihapus.' });
    } catch (error) {
        console.error(error);
        console.error(error.message);
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus pengguna.' });
    }
};


const logout = async(req, res) => {
    try {
        res.status(200).send({ auth: false, token: null });
    } catch (error) {
        
    }
}

module.exports = {
    signIn,
    signUp,
    getAllByUsers,
    getUserById,
    updateUsers,
    deleteUsers,
    updateUsersByAdmin,
    logout
}